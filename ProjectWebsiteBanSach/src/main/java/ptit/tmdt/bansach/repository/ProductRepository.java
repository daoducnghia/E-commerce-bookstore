package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    // @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.product p WHERE
    // p.product_name LIKE %?%", nativeQuery = true)
    // public List<ProductEntity> findAllByProductName(String name);

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.product p WHERE p.product_name LIKE %?%", nativeQuery = true)
    public List<ProductEntity> findByName(String name);

}
