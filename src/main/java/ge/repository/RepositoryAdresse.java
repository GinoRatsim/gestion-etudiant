package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAdresse extends JpaRepository<ge.model.ModelAdresse, Long> {

}
