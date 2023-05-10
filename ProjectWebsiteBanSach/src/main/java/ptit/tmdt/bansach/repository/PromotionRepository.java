/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.PromotionEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface PromotionRepository extends CrudRepository<PromotionEntity, Integer>{
    @Query(value = "SELECT * FROM promotion p WHERE p.promotion_name LIKE ?1", nativeQuery = true)
    public List<PromotionEntity> findAllByName(String promotionName);
    
}
