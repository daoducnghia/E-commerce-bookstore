/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.ProductEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface ProductRepository extends CrudRepository<ProductEntity, Integer> {

    @Query("SELECT product FROM ProductEntity product WHERE product.productName LIKE :name")
    public List<ProductEntity> findAllByProductName(String name);

}
