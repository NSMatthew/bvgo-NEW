import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ======================================================
  // STYLES GLOBAL ANDA YANG SUDAH ADA
  // ======================================================
  container: {
    // DEFINISI 'container' ANDA SEBELUMNYA SAYA GANTI DENGAN YANG DIBUTUHKAN HOME.TSX
    // KARENA NAMA YANG SAMA AKAN BERTABRAKAN.
    // ANDA BISA MENGGANTI NAMA SALAH SATUNYA JIKA KEDUANYA DIPERLUKAN.
    padding: 16,
    paddingBottom: 50,
  },
  primaryText: {
    fontFamily: "Satoshi",
    fontSize: 16,
    color: "#1076BC",
    fontWeight: "regular", // Catatan: 'regular' bukan nilai standar, mungkin maksud Anda '400' atau hilangkan saja.
    position: "relative",
    zIndex: 10,
  },
  secondaryText: {
    fontFamily: "Satoshi",
    fontSize: 16,
    color: "#A2A2A2A",
    fontWeight: "regular",
    position: "relative",
    zIndex: 10,
  },
  descText: {
    fontFamily: "Satoshi",
    fontSize: 12,
    color: "#0E0E0E",
    fontWeight: "regular",
    position: "relative",
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  splashText: {
    position: "absolute",
    top: "60%",
    fontSize: 18,
    color: "#0E0E0E",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  logoBVGO: {
    width: 220,
    height: 120,
    resizeMode: "contain",
    marginBottom: 30,
  },
  logoBV: {
    width: 180,
    height: 90,
    resizeMode: "contain",
  },
  
  // ======================================================
  // STYLE BARU YANG SPESIFIK UNTUK HOME.TSX
  // ======================================================
  newsletterSection: {
    marginTop: 10,
  },
  searchAndFilterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchWrapper: {
    flex: 1, 
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 8,
  },
  filterIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  filterButtonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContentWrapper: {
    position: 'absolute',
    top: 155,
    right: 16,
    alignItems: 'flex-end',
  },
  modalArrow: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginRight: 20,
    marginBottom: -8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 12,
  },

});

export default styles;