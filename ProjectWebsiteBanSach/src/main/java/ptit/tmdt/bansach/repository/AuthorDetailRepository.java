package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AuthorDetailEntity;
import ptit.tmdt.bansach.entity.AuthorEntity;
import ptit.tmdt.bansach.entity.ProductEntity;

@Repository
public interface AuthorDetailRepository extends JpaRepository<AuthorDetailEntity, Integer> {
    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.author_detail WHERE product_id = ? limit 1", nativeQuery = true)
    AuthorDetailEntity findByProductId(Integer id);

    @Query(value = "delete from author_detail where product_id = ?", nativeQuery = true)
    void deleteByProductId(Integer id);

    List<AuthorDetailEntity> findAllByProduct(ProductEntity pe);

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.author_detail where author_id = ?1 and product_id = ?2;", nativeQuery = true)
    AuthorDetailEntity findByAuthorAndProductId(int authorId, int productId);

    @Query(value = "Delete from author_detail where product_id = ?", nativeQuery = true)
    void deleteAllByProductId(int productId);

    // Object findAllById(int id);

    @Query(value = "SELECT * FROM author_detail WHERE product_id = ?", nativeQuery = true)
    List<AuthorDetailEntity> findAllByProductId(int id);

}
