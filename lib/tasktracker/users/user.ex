defmodule Tasktracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do

    password = nil
    name = nil
    # secret_pass = Comeonin.Argon2.hashpwsalt(attrs["pass"])
    if attrs["password"] != "" do
      password = Comeonin.Argon2.hashpwsalt(attrs["password"])
    end
    if attrs["name"] != "" do
      name=attrs["name"]
    end
    user_data = %{"name" => name, "password_hash" => password}
    IO.inspect user_data
    user
    |> cast(user_data, [:name, :password_hash])
    |> validate_required([:name, :password_hash])
    |> unique_constraint(:name)

  end

end
