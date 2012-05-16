class Vendor < ActiveRecord::Base
  validates :name, :presence => true

  has_and_belongs_to_many :categories
  has_many :related_images, :dependent => :destroy, :order => 'rank'
  has_many :images, :through => :related_images
  
  accepts_nested_attributes_for :related_images, :allow_destroy => true
  
end
