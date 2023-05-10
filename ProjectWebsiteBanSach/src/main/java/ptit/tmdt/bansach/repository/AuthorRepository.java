package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AuthorEntity;

@Repository
public interface AuthorRepository extends JpaRepository<AuthorEntity, Integer> {

    @Query(value = "select * from database_bansach_pthttmdt_btl.author where author_name = ?", nativeQuery = true)
    AuthorEntity findAllByName(String x);

    @Query(value = "SELECT a.* FROM database_bansach_pthttmdt_btl.author_detail ad, author a WHERE product_id = ? and ad.author_id = a.author_id", nativeQuery = true)
    List<AuthorEntity> findAuthorsByProductId(Integer id);
}
