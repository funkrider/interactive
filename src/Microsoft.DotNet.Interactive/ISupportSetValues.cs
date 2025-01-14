﻿// Copyright (c) .NET Foundation and contributors. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

using System;
using System.Threading.Tasks;

namespace Microsoft.DotNet.Interactive
{
    public interface ISupportSetValue
    {
        public Task SetValueAsync(string name, object value, Type declaredType = null);
    }
}