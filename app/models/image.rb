class Image < ActiveRecord::Base
  validates :name, :url, :thumbnail, :presence => true
  has_many :related_images, :dependent => :destroy
  has_many :vendors, :through => :related_images
  
end
