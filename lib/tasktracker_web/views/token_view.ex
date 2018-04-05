defmodule TasktrackerWeb.TokenView do
  use TasktrackerWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token,
      user_name: user.name,
    }
  end
end