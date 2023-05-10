/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.ShippingInformationEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface ShippingInformationRepository extends CrudRepository<ShippingInformationEntity, Integer>{

    public ShippingInformationEntity findByOrder(OrderEntity o);
    
}
