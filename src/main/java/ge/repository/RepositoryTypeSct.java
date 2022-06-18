package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryTypeSct extends JpaRepository<ge.model.ModelTypeSct, Long> {

}
