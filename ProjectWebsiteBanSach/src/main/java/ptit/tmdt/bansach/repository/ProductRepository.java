/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.CategoryEntity;
import ptit.tmdt.bansach.entity.ProductEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface ProductRepository extends CrudRepository<ProductEntity, Integer> {

        @Query("SELECT product FROM ProductEntity product WHERE product.productName LIKE :name")
        public List<ProductEntity> findAllByProductName(String name);

        // public String findIdByName(String productName);
        @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.product where product_name = ? order by product_id desc limit 1;", nativeQuery = true)
        public ProductEntity findByNameLatest(String productName);

        // public ProductEntity findAllById(Integer id);
        @Query(value = "SELECT\n"
                        + "  product.*\n"
                        + "FROM product\n"
                        + "ORDER BY product.number_of_product_sold DESC\n"
                        + "LIMIT 15", nativeQuery = true)
        public List<ProductEntity> findAllBanChay();

        @Query(value = "SELECT\n"
                        + "  product.*\n"
                        + "FROM product\n"
                        + "ORDER BY product.product_id DESC\n"
                        + "LIMIT 15", nativeQuery = true)
        public List<ProductEntity> findAllMoiNhat();

        @Query(value = "SELECT\n"
                        + "  product.*\n"
                        + "FROM product\n"
                        + "ORDER BY (product.old_price/product.price) DESC\n"
                        + "LIMIT 15", nativeQuery = true)
        public List<ProductEntity> findAllGiaTot();

        public List<ProductEntity> findAllByCategory(CategoryEntity category);

        @Query(value = "DELETE FROM product WHERE product_id = ?;", nativeQuery = true)
        public void deleteByProductId(Integer id);

        @Query(value = "Select * from product where product_id = ?;", nativeQuery = true)
        public ProductEntity findByProductId(Integer id);

        // public ProductEntity findByProduct(ProductEntity productEntity);

}
