package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    @Query(value = "select * from database_bansach_pthttmdt_btl.category where category_name = ?", nativeQuery = true)
    CategoryEntity findAllByName(String category);

    public List<CategoryEntity> findAllByCategoryIncludes(CategoryEntity category);

}
