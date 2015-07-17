Rails.application.routes.draw do

root 'welcome#home'

get '/maps' => 'maps#show'

get 'auth/:provider/callback' => 'sessions#create'
 get 'auth/failure' => '/'
 get '/signout' => 'sessions#destroy'


end
