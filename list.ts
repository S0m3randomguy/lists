
namespace lists {

    type Integer = number;
    function isInteger(value: number): value is Integer {
        return value === Math.floor(value);
    }

    const INVALID_INDEX = "Only non-negative integer indexes are allowed";
    const OUT_OF_RANGE = "Index is out of range";

    class List {
        items: {[key: number]: any};

        constructor(array?: any[]) {
            if (!array) return;
            array.forEach((value, index) => {
                this.items[index] = value;
            })
        }

        /**
         * Static methods
         */

        /**
         * Check if value is of `List` type
         * @param item Value to check
         * @returns true if item is an instane of `List`
         */
        static isList(item: any): item is List {
            return item instanceof List;
        }

        /**
         * Properties
         */

        get length(): number {
            return Object.keys(this.items).length;
        }

        /**
         * Read operations
         * Methods that access list items
         */
        
        /**
         * Get item at given index from list
         * @param T generic type to cast to
         * @param index Index to get
         * @returns item at index cast to T type
         */
        get<T>(index: Integer): T {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            return this.items[index] as T;
        }
    }

}