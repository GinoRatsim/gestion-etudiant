package ge.model;

public class ModelReussite {

	private Object anneeScolaire;
	private Object[] L1;
	private Object[] L2;
	private Object[] L3;
	private Object[] M1;
	private Object[] M2;
	
	public ModelReussite() {
		super();
	}
	
	public ModelReussite(Object anneeScolaire, Object[] l1, Object[] l2, Object[] l3, Object[] m1, Object[] m2) {
		super();
		this.anneeScolaire = anneeScolaire;
		L1 = l1;
		L2 = l2;
		L3 = l3;
		M1 = m1;
		M2 = m2;
	}

	public Object getAnneeScolaire() {
		return anneeScolaire;
	}

	public void setAnneeScolaire(Object adm) {
		this.anneeScolaire = adm;
	}

	public Object[] getL1() {
		return L1;
	}

	public void setL1(Object[] l1) {
		L1 = l1;
	}

	public Object[] getL2() {
		return L2;
	}

	public void setL2(Object[] l2) {
		L2 = l2;
	}

	public Object[] getL3() {
		return L3;
	}

	public void setL3(Object[] l3) {
		L3 = l3;
	}

	public Object[] getM1() {
		return M1;
	}

	public void setM1(Object[] m1) {
		M1 = m1;
	}

	public Object[] getM2() {
		return M2;
	}

	public void setM2(Object[] m2) {
		M2 = m2;
	}
	
}
