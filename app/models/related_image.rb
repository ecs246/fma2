class RelatedImage < ActiveRecord::Base
  belongs_to :vendor
  belongs_to :image
end
