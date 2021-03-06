defmodule TasktrackerWeb.TokenController do
  use TasktrackerWeb, :controller
  alias  Tasktracker.Users.User

  action_fallback TasktrackerWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Tasktracker.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
