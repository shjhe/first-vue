export function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_;
  seller = seller && JSON.parse(seller) || {};
  seller[id] = seller[id] || {};
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
}

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) return def;
  seller = JSON.parse(seller)[id];
  if (!seller) return def;
  return seller[key] || def;
}
