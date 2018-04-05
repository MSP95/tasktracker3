defmodule TasktrackerWeb.Router do
  use TasktrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasktrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/assignments", PageController, :index
    get "/tasks", PageController, :index
    get "/tasks/:id", PageController, :index
    get "/task-form", PageController, :index
    get "/task-edit/:id", PageController, :index
    get "/register", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TasktrackerWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/token", TokenController, :create


  end
end
