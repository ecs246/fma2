module ActiveAdmin::CategoriesHelper

  def process_category(pcategory,&blocko)
    str = ""
    pcategory.leveled_descendant_array.each do |lis|
      category = lis[0]
      level = lis[1]
      str << capture(category,level,&blocko)
    end
    raw(str)
  end

  def loop_all_categories(&blocko)
    str = ""
    arr = Category.all_leveled_descendant_array
    arr.each do |item| 
        cat,level = item
        str << raw(capture(cat,level,&blocko))
    end
    raw(str)
  end  
  
  def convert_to_array(cats,level_incr=0) 
    arr = []
    cats.map! do |item|  
      cat,level = item
      arr << ["-"*(level+level_incr)+cat.name,cat.id]
    end
    arr
  end  
  
  def get_category_options_array
    cats = []
    cats = Category.all_leveled_descendant_array
    
    cats = convert_to_array(cats)
    cats.unshift(["none",""])
    
  end
 
  def get_edit_category_options_array(cat)
    level = cat.parents_array.size
    parent_categories_options = convert_to_array(Category.all_leveled_descendant_array) - convert_to_array(cat.leveled_descendant_array,level) 
    parent_categories_options = parent_categories_options - [["-"*level+cat.name,cat.id]]
    parent_categories_options.unshift(["none",""])
  end  
  
  
end  