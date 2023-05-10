package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.OrderDetailEntity;
import ptit.tmdt.bansach.entity.OrderEntity;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
    @Query(value = "SELECT COUNT(*) FROM order_detail ode, tbl_order o WHERE ode.order_id = o.order_id and o.order_id = ?;", nativeQuery = true)
    int countByOrderId(int order_id);

    public List<OrderDetailEntity> findAllByOrder(OrderEntity o);
}
