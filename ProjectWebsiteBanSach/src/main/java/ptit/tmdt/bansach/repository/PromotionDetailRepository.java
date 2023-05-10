/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.PromotionDetailEntity;
import ptit.tmdt.bansach.entity.PromotionEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface PromotionDetailRepository extends CrudRepository<PromotionDetailEntity, Integer>{

    public List<PromotionDetailEntity> findAllByPromotion(PromotionEntity promotion);

    public List<PromotionDetailEntity> findAllByProduct(ProductEntity product);
    
}
