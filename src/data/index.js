const categoriesModules = import.meta.glob("./categories/*/*.js");

export const getCategories = () => {
  return Promise.all(
    Object.values(categoriesModules).map((module) =>
      module().then((m) => m.data)
    )
  );
};
