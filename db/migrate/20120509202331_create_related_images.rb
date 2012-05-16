class CreateRelatedImages < ActiveRecord::Migration
  def change
    create_table :related_images do |t|
      t.integer :vendor_id
      t.integer :image_id
      t.integer :rank
      t.string :alt_title
      t.text :alt_description

      t.timestamps
    end
  end
end
