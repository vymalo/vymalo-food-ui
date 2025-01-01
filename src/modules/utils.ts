import * as _ from 'lodash';


export function removeEmptyValues<T>(obj: T): T {
	const clean = _.omitBy(obj as any, _.isNil);
	const nested = _.mapValues(clean, (v) => {
		if (typeof v === 'object') {
			return removeEmptyValues(v);
		}
		return v;
	});
	return _.reduce(_.entries(nested), (acc, [k, v]) => {
		if (typeof v === 'object' && _.isEmpty(v)) {
			return acc;
		}
		return { ...acc, [k]: v };
	}, {} as T);
}