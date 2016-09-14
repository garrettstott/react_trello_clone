class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :description
      t.belongs_to :list, foreign_key: true

      t.timestamps
    end
  end
end
