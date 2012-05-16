class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :name
      t.string :short_description
      t.string :keywords
      t.string :url
      t.string :thumbnail
      t.timestamps
    end
  end
end
