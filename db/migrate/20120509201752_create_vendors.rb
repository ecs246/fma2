class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :short_description
      t.text :description
      t.string :url
      t.float :latitude
      t.float :longitude
      t.text :address

      t.timestamps
    end
  end
end
