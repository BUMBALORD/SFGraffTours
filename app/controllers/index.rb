require "sinatra"
require "instagram"
require 'dotenv'
require "pp"

Dotenv.load


enable :sessions

CALLBACK_URL = "http://localhost:9393/oauth/callback"

Instagram.configure do |config|
  config.client_id = ENV['CLIENT_ID']
  config.client_secret = ENV['CLIENT_SECRET']
end

get '/' do
  erb :login
end

get '/oauth' do
  redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
  session[:access_token] = response.access_token
  redirect "/index"
end

get '/index' do

  erb :index
end

get "/tags/tag-name/media/recent" do
  @storage = []
  client = Instagram.client(:access_token => session[:access_token])
  tags = client.tag_search("sfgraffiti")
  pp client.tag_recent_media(tags[0].name)
  for media_item in client.tag_recent_media(tags[0].name)
    @storage << "<img src='#{media_item.images.thumbnail.url}'>"
  end
  return @storage.to_json
end

