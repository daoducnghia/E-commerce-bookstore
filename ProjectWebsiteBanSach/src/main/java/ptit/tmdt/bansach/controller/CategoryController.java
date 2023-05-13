/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.CategoryEntity;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.repository.CategoryRepository;
import ptit.tmdt.bansach.repository.ProductRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;
    
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/get-category-parent")
    public List<CategoryBase> getCategoryParent() {
        try {
            List<CategoryBase> listCategory = getCategoryByCategoryParent(null);
            return listCategory;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-category")
    public List<Category> getCategory() {
        try {
            List<CategoryBase> listParent = getCategoryByCategoryParent(null);
            List<Category> listCategory = new ArrayList<>();
            for (CategoryBase c : listParent) {
                Category category = new Category();
                category.setCategory(c);
                CategoryEntity cae = new CategoryEntity(c.getCategoryId(), c.getCategoryName(), c.getLinkImage(), null);
                category.setListCategory(getCategoryByCategoryParent(cae));
                listCategory.add(category);
            }
            return listCategory;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    private List<CategoryBase> getCategoryByCategoryParent(CategoryEntity category) {
        try {
            List<CategoryBase> listCategory = new ArrayList<>();
            List<CategoryEntity> list = categoryRepository.findAllByCategoryIncludes(category);
            for (CategoryEntity c : list) {
                CategoryBase cb = new CategoryBase();
                cb.setCategoryId(c.getCategoryId());
                cb.setCategoryName(c.getCategoryName());
                cb.setLinkImage(c.getLinkImage());
                listCategory.add(cb);
            }
            return listCategory;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }
    
    @GetMapping("/get-all-product-by-category")
    public List<ProductEntity> getAllProductByCategory(@RequestParam("category") int categoryId){
        try {
            CategoryEntity ce = categoryRepository.findById(categoryId).get();
            List<CategoryEntity> listCategory = categoryRepository.findAllByCategoryIncludes(ce);
            List<ProductEntity> listProduct = new ArrayList<>();
            listProduct.addAll(productRepository.findAllByCategory(ce));
            for(CategoryEntity cte: listCategory){
                listProduct.addAll(productRepository.findAllByCategory(cte));
            }
            return listProduct;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }
}

class Category {

    private CategoryBase category;
    private List<CategoryBase> listCategory;

    public CategoryBase getCategory() {
        return category;
    }

    public void setCategory(CategoryBase category) {
        this.category = category;
    }

    public List<CategoryBase> getListCategory() {
        return listCategory;
    }

    public void setListCategory(List<CategoryBase> listCategory) {
        this.listCategory = listCategory;
    }
}

class CategoryBase {

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getLinkImage() {
        return linkImage;
    }

    public void setLinkImage(String linkImage) {
        this.linkImage = linkImage;
    }
    private int categoryId;
    private String categoryName;
    private String linkImage;
}
