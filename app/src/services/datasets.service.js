export default {
  GLAD: {
    //umd_as_it_happens: {
    datastoreId: "umd_glad_landsat_alerts",
    query: {
      confidenceKey: "umd_glad_landsat_alerts__confidence",
      dateKey: "umd_glad_landsat_alerts__date",
      requiresMaxDate: true,
      tableName: "umd_glad_landsat_alerts",
      maxDate: 184
    }
  },
  GLADS2: {
    //glad_sentinel_2: {
    datastoreId: "umd_glad_sentinel2_alerts",
    query: {
      confidenceKey: "umd_glad_sentinel2_alerts__confidence",
      dateKey: "umd_glad_sentinel2_alerts__date",
      requiresMaxDate: true,
      tableName: "umd_glad_sentinel2_alerts",
      maxDate: 184
    }
  },
  RADD: {
    //wur_radd_alerts: {
    datastoreId: "wur_radd_alerts",
    query: {
      confidenceKey: "wur_radd_alerts__confidence",
      dateKey: "wur_radd_alerts__date",
      requiresMaxDate: true,
      tableName: "wur_radd_alerts",
      maxDate: 184
    }
  },
  VIIRS: {
    //viirs: {
    datastoreId: "nasa_viirs_fire_alerts",
    query: {
      dateKey: "alert__date",
      requiresMaxDate: false,
      tableName: "mytable",
      maxDate: 12
    }
  }
};
