<<<<<<< HEAD
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.OrderDetailEntity;
import ptit.tmdt.bansach.entity.OrderEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetailEntity, Integer>{

    public List<OrderDetailEntity> findAllByOrder(OrderEntity o);
    
=======
package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.OrderDetailEntity;
import ptit.tmdt.bansach.entity.OrderEntity;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
    @Query(value = "SELECT COUNT(*) FROM order_detail ode, tbl_order o WHERE ode.order_id = o.order_id and o.order_id = ?;", nativeQuery = true)
    int countByOrderId(int order_id);

>>>>>>> 49f9fda86986a2da279caa92e58b8b82dacc4f26
}
