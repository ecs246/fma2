module ActiveAdmin::ImageUtilityHelper
  
require "net/http"
require "uri"
require "digest/md5"
require "rexml/document"

  
  class XmlFlickrObj
    API_KEY = '8f7cc5f3e11452db7f1aa51361c1e04a'
    METHOD = 'flickr.people.getPublicPhotos'
    USER_ID = '43313252@N02'
    attr_accessor :numItems, :currentPage
    attr_reader :totalPages, :doc
    def initialize(attrhsh = {})
      if (attrhsh.has_key?(:numItems))
        @numItems = attrhsh[:numItems]
      end
      if (attrhsh.has_key?(:currentPage))
        @currentPage = attrhsh[:currentPage]
      end
      xml = get_flickr_xml();
      @doc = REXML::Document.new(xml)
      @totalPages = REXML::XPath.first(doc,'/rsp/photos/@pages')
      puts "totalpages = #{@totalPages} "
    end
    def display_each_item () 
      tmp = ""
      @doc.elements.each('rsp/photos/photo') do |el|
        #yield(el.attributes['url_m'],el.attributes['title'],el.attributes['url_t'])
        yield(el)
      end
    end
    
       
    def get_pagination_html 
      #uri = request.env['PATH_INFO']
      puts caller.methods;
      #uri = helper
      #html = ""
=begin      
      for i in 1..@total_pages do
        if (@current_page != i)
          html << "<a href='#{uri}'>#{i}</a>"
        else 
          html << i
        end
        
    
      end
      html
=end      
   end    
    
    private 
    def get_flickr_xml()
     request ="http://api.flickr.com/services/rest/?method=#{METHOD}&user_id=#{USER_ID}&extras=url_t,url_l&api_key=#{API_KEY}"
     if (@currentPage != nil)
       request << "&page=#{@currentPage}"
     end
     if (@numItems != nil)
       request << "&per_page=#{@numItems}"
     end
      puts request
      response = Net::HTTP.get_response(URI.parse(request)).body;
      
     
   
     
    end
 
  end
 
  
 
  
 
  
end