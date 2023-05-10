<<<<<<< HEAD
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.ReviewEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface ReviewRepository extends CrudRepository<ReviewEntity, Integer>{
    
=======
package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.ReviewEntity;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.review WHERE product_id = ?", nativeQuery = true)
    List<ReviewEntity> findByProductId(int idProduct);

>>>>>>> 49f9fda86986a2da279caa92e58b8b82dacc4f26
}
