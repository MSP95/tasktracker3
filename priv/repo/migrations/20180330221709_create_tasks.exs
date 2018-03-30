defmodule Tasktracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :text,null: false
      add :timetrack, :integer, default: 0
      add :completed, :boolean, default: false, null: false
      add :assigned_id, references(:users, on_delete: :nilify_all),null: true
      add :user_id, references(:users, on_delete: :nilify_all),null: true

      timestamps()
    end

    create index(:tasks, [:user_id])
    create index(:tasks, [:assigned_id])
  end
end
