package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelNotes;

@Repository
public interface RepositoryNotes extends JpaRepository<ModelNotes, Long> {

	@Query(value = "SELECT * FROM notes WHERE id_etudiant = ?1", nativeQuery = true)
	List<ModelNotes> findNoteByEtudiant(Long id);
	
	@Query(value = "SELECT * FROM notes WHERE notes < 10", nativeQuery = true)
	List<ModelNotes> allNotesRattrapage();
	
}
