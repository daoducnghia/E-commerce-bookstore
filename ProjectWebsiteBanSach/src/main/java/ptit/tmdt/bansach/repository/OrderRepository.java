/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.UserEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    public List<OrderEntity> findAllByUser(UserEntity user);
    
    public List<OrderEntity> findAllByUser(UserEntity user, Sort sort);

    public List<OrderEntity> findAllByUserAndOrderStatus(UserEntity user, String statusOrder);

    public List<OrderEntity> findAllByUserAndOrderStatus(UserEntity user, String statusOrder, Sort sort);

    public List<OrderEntity> findAllByOrderStatusIn(List<String> statusOrder);

    @Query(value = "SELECT * FROM tbl_order WHERE order_id LIKE ?1", nativeQuery = true)
    public List<OrderEntity> getAllById(String idOrder);
}
