package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.LanguageEntity;

@Repository
public interface LanguageRepository extends JpaRepository<LanguageEntity, Integer> {
    @Query(value = "select * from database_bansach_pthttmdt_btl.language where language_name = ?", nativeQuery = true)
    LanguageEntity findAllByName(String language);

}
