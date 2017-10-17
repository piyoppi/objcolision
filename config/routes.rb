Rails.application.routes.draw do
  get '/home', to: 'game_creating_pages#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
