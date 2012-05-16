ActiveAdmin.register_page "Image Utility" do
  
  controller do 
    layout 'active_admin'
    include Admin::ImageUtilityHelper
    def index
       
      @flick = XmlFlickrObj.new(:numItems=>30,:currentPage=>params[:page])
      
    end
    
  end
end
