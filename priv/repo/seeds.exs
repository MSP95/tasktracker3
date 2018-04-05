# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker.Repo.insert!(%Tasktracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktracker.Repo
  alias Tasktracker.Users.User
  alias Tasktracker.Tasks.Task

  def run do

    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", password_hash: p  })
    b = Repo.insert!(%User{ name: "bob", password_hash: p  })
    c = Repo.insert!(%User{ name: "carol", password_hash: p  })
    d = Repo.insert!(%User{ name: "dave", password_hash: p  })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, assigned_id: b.id, title: "Hi, Created Alice", description: "assigned to bob" })
    Repo.insert!(%Task{ user_id: b.id, assigned_id: a.id, title: "Hi, Created Bob", description: "assigned to Alice" })
    Repo.insert!(%Task{ user_id: b.id, assigned_id: c.id, title: "Hi, Created Bob", description: "assigned to carol" })
    Repo.insert!(%Task{ user_id: c.id, assigned_id: d.id, title: "Hi, Created carol", description: "assigned to dave" })
    Repo.insert!(%Task{ user_id: d.id, assigned_id: b.id, title: "Hi, Created Dave", description: "assigned to bob" })
  end
end

Seeds.run
