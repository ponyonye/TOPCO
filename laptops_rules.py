def recommend_laptops(jurusan, budget, laptops):
    results = []
    fallback_results = []

    min_price = budget - 3000000 # Batas bawah harga

    for laptop in laptops:
        price = laptop.get('price', 0)
        recommended = laptop.get('recommended_for')

        # Cek kecocokan jurusan
        cocok = False
        if isinstance(recommended, str):
            cocok = jurusan.lower() in recommended.lower()
        elif isinstance(recommended, list):
            cocok = any(jurusan.lower() in dept.lower() for dept in recommended)

        if cocok:
            # Jika dalam rentang yang ideal
            if min_price <= price <= budget:
                results.append(laptop)
            # Jika masih di bawah budget tapi di luar rentang ideal, masuk ke fallback
            elif price <= budget:
                fallback_results.append(laptop)

    # Jika tidak ada yang cocok dalam rentang ideal, gunakan cadangan
    if results:
        return results
    else:
        return fallback_results