package ge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "memoire")
public class ModelMemoire {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_memoire")
	@SequenceGenerator(name = "generator_memoire", sequenceName = "_seq_memoire")
	private Long idMemoire;
	@ManyToOne
	@JoinColumn(name = "id_contrat", nullable = false)
	private ModelContrat contrat;
	private int estObligatoire;
	private int aSoutenance;
	private int estValide;
	private double notesSoutenance;
	private double notesRapports;
	
	public ModelMemoire() {
		super();
	}

	public ModelMemoire(Long idMemoire, ModelContrat contrat, int estObligatoire, int aSoutenance, int estValide, double notesSoutenance, double notesRapports) {
		super();
		this.idMemoire = idMemoire;
		this.contrat = contrat;
		this.estObligatoire = estObligatoire;
		this.aSoutenance = aSoutenance;
		this.estValide = estValide;
		this.notesRapports = notesRapports;
		this.notesSoutenance = notesSoutenance;
	}

	public Long getIdMemoire() {
		return idMemoire;
	}

	public void setIdMemoire(Long idMemoire) {
		this.idMemoire = idMemoire;
	}

	public ModelContrat getContrat() {
		return contrat;
	}

	public void setContrat(ModelContrat contrat) {
		this.contrat = contrat;
	}

	public int getEstObligatoire() {
		return estObligatoire;
	}

	public void setEstObligatoire(int estObligatoire) {
		this.estObligatoire = estObligatoire;
	}

	public int getaSoutenance() {
		return aSoutenance;
	}

	public void setaSoutenance(int aSoutenance) {
		this.aSoutenance = aSoutenance;
	}

	public int getEstValide() {
		return estValide;
	}

	public void setEstValide(int estValide) {
		this.estValide = estValide;
	}

	public double getNotesSoutenance() {
		return notesSoutenance;
	}

	public void setNotesSoutenance(double notesSoutenance) {
		this.notesSoutenance = notesSoutenance;
	}

	public double getNotesRapports() {
		return notesRapports;
	}

	public void setNotesRapports(double notesRapports) {
		this.notesRapports = notesRapports;
	}
	
}
