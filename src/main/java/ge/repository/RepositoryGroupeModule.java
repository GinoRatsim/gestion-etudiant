package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryGroupeModule extends JpaRepository<ge.model.ModelGroupeModule, Long> {

}
