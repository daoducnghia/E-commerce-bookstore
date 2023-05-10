package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.PublishingCompanyEntity;

@Repository
public interface PublishingCoRepository extends JpaRepository<PublishingCompanyEntity, Integer> {
    @Query(value = "select * from database_bansach_pthttmdt_btl.publishing_company where lower(publishing_company_name) = lower(?);", nativeQuery = true)
    PublishingCompanyEntity findAllByName(String nxb);

}
