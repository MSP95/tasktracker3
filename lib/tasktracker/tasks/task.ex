defmodule Tasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :timetrack, :integer
    field :title, :string
    belongs_to :assigned, Tasktracker.Users.User, foreign_key: :assigned_id
    belongs_to :user, Tasktracker.Users.User, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :user_id, :assigned_id,:timetrack])
    |> validate_required([:assigned_id, :user_id, :title, :description, :completed,:timetrack])
    |> validate_change(:timetrack, fn :timetrack, minutes ->
      if rem(minutes, 15) == 0 && minutes >= 0 do
        []
      else
        [timetrack: "Invalid time. Please enter time in 15 minute intervals"]
      end
    end)
  end
end
