package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelEtudiant;

@Repository
public interface RepositoryEtudiant extends JpaRepository<ge.model.ModelEtudiant, Long> {

	@Query(value = "SELECT niveau.code_niveau, niveau.libelle_niveau, count(*) FROM etudiant JOIN niveau ON niveau.id_niveau = etudiant.id_niveau GROUP BY niveau.id_niveau; ", nativeQuery = true)
	List<Object> getNombreEtudiantByNiveau();
	
	@Query(value = "SELECT type_contrat.libelle_type_contrat, count(*) FROM etudiant JOIN contrat ON contrat.id_contrat = etudiant.id_contrat JOIN type_contrat ON type_contrat.id_type_contrat = contrat.id_type_contrat GROUP BY type_contrat.id_type_contrat;  ", nativeQuery = true)
	List<Object> getNombreEtudiantByTypeContrat();
	
	@Query(value = "SELECT type_formation.libelle_type_formation, count(*) FROM etudiant JOIN type_formation ON type_formation.id_type_formation = etudiant.id_type_formation GROUP BY type_formation.id_type_formation; ", nativeQuery = true)
	List<Object> getNombreEtudiantByTypeFormation();
	
	@Query(value = "SELECT campus.code_campus, campus.libelle_campus, count(*) FROM etudiant JOIN campus ON campus.id_campus = etudiant.id_campus GROUP BY campus.id_campus; ", nativeQuery = true)
	List<Object> getNombreEtudiantByCampus();
	
	@Query(value = "SELECT type_contrat.libelle_type_contrat, count(*) FROM anciens JOIN type_contrat ON type_contrat.id_type_contrat = anciens.id_type_contrat GROUP BY type_contrat.id_type_contrat; ", nativeQuery = true)
	List<Object> getNombreAnciensParTypeContrat();
	
	@Query(value = "SELECT specialite.code_specialite, specialite.libelle_specialite, count(*) FROM etudiant JOIN specialite ON specialite.id_specialite = etudiant.id_specialite GROUP BY specialite.id_specialite; ", nativeQuery = true)
	List<Object> getNombreEtudiantBySpecialite();
	
	@Query(value = "SELECT etudiant.* FROM etudiant WHERE actuel = 1 AND id_etudiant NOT IN (SELECT id_etudiant FROM anciens);", nativeQuery = true)
	List<ModelEtudiant> getEtudiantsActuel();
	
	//Pour les taux de réussite
	@Query(value = "SELECT annee_scolaire.annee, niveau.code_niveau, count(*) FROM etudiant JOIN annee_scolaire ON annee_scolaire.id_annee_scolaire = etudiant.id_annee_scolaire JOIN niveau ON niveau.id_niveau = etudiant.id_niveau WHERE actuel = 1 AND etudiant.id_annee_scolaire=? GROUP BY niveau.id_niveau;", nativeQuery = true)
	List<Object[]> getTotalParNiveau(Long id);

	@Query(value = "SELECT annee_scolaire.annee, niveau.code_niveau, count(*) FROM etudiant JOIN annee_scolaire ON annee_scolaire.id_annee_scolaire = etudiant.id_annee_scolaire JOIN niveau ON niveau.id_niveau = etudiant.id_niveau WHERE actuel = 1 AND etudiant.id_annee_scolaire=? AND admis = 1 GROUP BY niveau.id_niveau;", nativeQuery = true)
	List<Object[]> getTotalParAdmis(Long id);
	
	@Query(value = "SELECT annee_scolaire.annee, niveau.code_niveau, count(*) FROM etudiant JOIN annee_scolaire ON annee_scolaire.id_annee_scolaire = etudiant.id_annee_scolaire JOIN niveau ON niveau.id_niveau = etudiant.id_niveau WHERE actuel = 1 AND etudiant.id_annee_scolaire=? AND admis = 0 GROUP BY niveau.id_niveau;", nativeQuery = true)
	List<Object[]> getTotalParNonAdmis(Long id);
	
	@Query(value = "SELECT * FROM etudiant WHERE id_personne = ? AND actuel = 1;", nativeQuery = true)
	ModelEtudiant getByPersonne(Long id);
	
}
