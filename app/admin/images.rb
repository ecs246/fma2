ActiveAdmin.register Image do
     form :partial => "form" 
 
  
  controller do 
  def create
    @image = Image.new(params[:image])
    
    respond_to do |format|
      if @image.save
        format.html { redirect_to([:admin,@image], :notice => 'Image was successfully created.') }
        format.xml  { render :xml => [:admin,@image], :status => :created, :location => @image }
        format.json   do 
          render :json=> @image,
          :content_type => 'text/json',
          :status => :created          
        end
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @image.errors, :status => :unprocessable_entity }
        format.json { render :status=>:unprocessable_entity ,:json => @image.errors, :content_type => 'text/json' }

      end
    end
  end 
  end  
end
