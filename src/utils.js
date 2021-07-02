export const checkIsOrgDescendantOfParent = ({ organizations, parentOrg, childOrg, isParentFound = false }) =>
    organizations.some(({ code }) => code === childOrg) && isParentFound
        ? true
        : organizations.some(({ code, children }) =>
              checkIsOrgDescendantOfParent({
                  organizations: children,
                  parentOrg,
                  childOrg,
                  isParentFound: isParentFound || code === parentOrg,
              })
          )
